
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowUp, Bot, Settings, User } from "lucide-react";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const formSchema = z.object({
  apiKey: z.string().min(1, "API Key is required"),
});

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your financial assistant. How can I help you today with your financial questions or needs?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem("gemini-api-key") || "";
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: apiKey || "",
    },
  });

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Check if API key is set on mount
  useEffect(() => {
    if (!apiKey) {
      setDialogOpen(true);
    }
  }, [apiKey]);

  const saveApiKey = (values: z.infer<typeof formSchema>) => {
    localStorage.setItem("gemini-api-key", values.apiKey);
    setApiKey(values.apiKey);
    setDialogOpen(false);
    toast.success("API key saved successfully!");
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    if (!apiKey) {
      setDialogOpen(true);
      return;
    }

    // Add user message
    const userMessage = { role: "user" as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Create context with previous messages for better conversation flow
      const context = messages.slice(-5).map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
      }));

      // Add user's new message
      context.push({
        role: "user",
        parts: [{ text: input }]
      });

      // Prepare the API request
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=" + apiKey, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: context,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        }),
      });

      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        const assistantResponse = data.candidates[0].content.parts[0].text;
        setMessages(prev => [...prev, { role: "assistant", content: assistantResponse }]);
      } else if (data.promptFeedback?.blockReason) {
        toast.error("Your message was blocked for safety reasons.");
        console.error("Content blocked:", data.promptFeedback);
      } else {
        throw new Error("Failed to get a valid response");
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      toast.error("Failed to get a response. Please check your API key and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Financial Assistant</h1>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </DialogTrigger>
        </div>

        <Card className="p-4 h-[calc(100vh-240px)] flex flex-col bg-card">
          <div className="flex-1 overflow-y-auto space-y-4 p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "assistant" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[80%] animate-slide-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-lg ${
                      message.role === "assistant"
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center border mt-1">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t pt-4 mt-auto">
            <div className="flex space-x-2">
              <Input
                placeholder="Ask anything about finance..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className="flex-1"
              />
              <Button onClick={sendMessage} disabled={isLoading || !input.trim()}>
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
            {isLoading && (
              <p className="text-sm text-muted-foreground animate-pulse mt-2">
                Thinking...
              </p>
            )}
          </div>
        </Card>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gemini API Settings</DialogTitle>
            <DialogDescription>
              Enter your Gemini API key to enable the chat functionality.
              You can get an API key from the{" "}
              <a
                href="https://makersuite.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-primary underline"
              >
                Google AI Studio
              </a>.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(saveApiKey)} className="space-y-4">
              <FormField
                control={form.control}
                name="apiKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gemini API Key</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your API key" {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Save API Key</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Chat;
