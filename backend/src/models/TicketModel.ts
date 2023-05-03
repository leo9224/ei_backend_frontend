export class Ticket {
    id: number
    title:string
    description: string|null
    status: string

    constructor(id: number,title:string, description: string|null,status:string) {
        this.id = id
        this.title=title
        this.description = description
        this.status=status
    }
}