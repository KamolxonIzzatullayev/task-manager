// src/app/models/task.model.ts
export class Task {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public status: 'Pending' | 'Completed'
    ) { }
}
