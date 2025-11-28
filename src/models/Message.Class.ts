// Clase que maneja los mensajes/comentarios de las publicaciones
export class Message {
    private message_id: string;
    private publication_id: string;
    private user_id: string;
    private content: string;
    private created_at: Date;

    constructor(message_id: string, publication_id: string, user_id: string, content: string) {
        this.message_id = message_id;
        this.publication_id = publication_id;
        this.user_id = user_id;
        this.content = content;
        this.created_at = new Date();
    }

    public getMessageId(): string {
        return this.message_id;
    }

    public getContent(): string {
        return this.content;
    }

    public getPublicationId(): string {
        return this.publication_id;
    }

    public getUserId(): string {
        return this.user_id;
    }

    public getCreatedAt(): Date {
        return this.created_at;
    }

    public updateContent(newContent: string): void {
        this.content = newContent;
    }
}