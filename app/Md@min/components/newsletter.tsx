import { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";

export interface Newsletter {
  id: number;
  email: string;
  subscribedAt: Date;
}

const Newsletter = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isShow, setShow] = useState(false);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/subscribe/sendNewsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subject, content }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || "Emails sent successfully");
        setShow(false);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error("Error sending newsletter:", err);
      setError("Error sending newsletter");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const response = await fetch("/api/subscribe");
        const data = await response.json();
        setNewsletters(data);
      } catch (error) {
        console.error("Error fetching newsletters:", error);
      } finally {
        setIsLoading(false); // Stop loading after data is fetched
      }
    };

    fetchNewsletters();
  }, []);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-2">Messages</h1>
        <button
          onClick={() => {
            setShow(true);
          }}
          className="flex bg-indigo-600 font-semibold p-2 text-zinc-300 rounded-sm hover:scale-103 cursor-pointer"
        >
          Announcement
          <FiSend className="m-1" />
        </button>
      </div>
      <p className="text-zinc-400">View contact form messages from visitors.</p>
      <div>
        {isShow && (
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
              isShow ? "opacity-100" : "opacity-0"
            }`}
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-6 text-zinc-800 bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
            >
              <h2 className="text-xl font-bold text-gray-800">
                Send Announcement
              </h2>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter the subject"
                />
              </div>

              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={6}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write your message here..."
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setShow(false)}
                  className="py-2 px-4 text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`py-2 px-6 text-white font-semibold rounded-lg ${
                    isSubmitting
                      ? "bg-gray-400 "
                      : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Send"}
                </button>
              </div>
            </form>
          </div>
        )}
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : newsletters.length > 0 ? (
            newsletters.map((newsletter) => (
              <div
                key={newsletter.id}
                className="flex items-center justify-between py-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
                    {newsletter.email.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-md font-medium">{newsletter.email}</h2>
                    <p className="text-sm text-gray-500">
                      Subscribed on{" "}
                      {new Date(newsletter.subscribedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  {new Date(newsletter.subscribedAt).toLocaleTimeString()}
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center py-10">
              <p className="text-zinc-400 text-xl">No Newsletter registered</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Newsletter;