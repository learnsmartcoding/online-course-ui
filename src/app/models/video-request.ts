export interface VideoRequest {
    videoRequestId: number; // table's primary key value
    userId?: number; //table's userid
    userName: string;            // User's name
    topic: string;           // Main topic (e.g., Angular, Azure Service)
    subTopic?: string;       // Subtopic (optional, based on selected topic)
    requestStatus: string;          // Status of the request (requested, reviewed, inprocess, completed, published)
    shortTitle: string;      // Short title for the video request
    requestDescription: string;     // Detailed description of the video request
    response?: string;       // Response to the request (optional, initially disabled)
    videoUrls?: string;       // URL of the video created in response to the request (optional)
  }
  