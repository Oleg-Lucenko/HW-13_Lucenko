
interface ITask {
    id: number;
    title: string;
    text: string;
    date: Date;
    dateOfEditing : Date;
    taskStatus: boolean;
}


class TaskList {
    tasks: Array<Task | ConfirmedTask> = [];



    set newTask(task: Task | ConfirmedTask) {
        this.tasks.push(task);
    };

    removeTask(taskID: number): void {
        this.tasks.filter(task => task.id != taskID);
    };

    getInfoAboutTask(taskID: number): Task {
        let [requestedTask]: Task[] = this.tasks.filter(task => task.id === taskID);

        return requestedTask;
    };

    get getListOfTasks(): Task[] {
        return this.tasks;
    };

    get getListOfNotDoneTasks(): Task[] {
        return this.tasks.filter(task => task.taskStatus === false);
    };

    editTask(taskID: number, titleValue: string, textValue: string) {
        let task: Task | undefined = this.tasks.find(task => task.id === taskID);
        if (task === undefined) {
            throw new Error('Incorrect id of task')
        };
        task.editTask(titleValue, textValue);
    };

    markTaskAsDone(taskID: number) {
        let task: Task | undefined = this.tasks.find(task => task.id === taskID);
        if (task === undefined) {
            throw new Error('Incorrect id of task')
        };
        task.markTaskAsDone;
    };

};

class Task implements ITask{
    id: number;
    title: string;
    text: string;
    date: Date;
    dateOfEditing : Date;
    taskStatus: boolean;

    constructor(title: string, text: string) {
        this.id = Math.random();
        this.title = title;
        this.text = text;
        this.date = new Date;
    };

    editTask(titleValue: string, textValue: string) {
        this.title = titleValue;
        this.text = textValue;
        this.dateOfEditing = new Date;
    };

    markTaskAsDone() {
        this.taskStatus === undefined ? this.taskStatus = true : this.taskStatus = !this.taskStatus;
    };
 
};

class ConfirmedTask implements ITask{
    private confirmed: boolean = false
    id: number;
    title: string;
    text: string;
    date: Date;
    dateOfEditing : Date;
    taskStatus: boolean;

    constructor(title: string, text: string) {
        this.id = Math.random();
        this.title = title;
        this.text = text;
        this.date = new Date;
    };

    editTask(titleValue: string, textValue: string) {
        if (this.confirmed) return;

        this.title = titleValue;
        this.text = textValue;
        this.dateOfEditing = new Date;
    };

    markTaskAsDone() {
        this.taskStatus === undefined ? this.taskStatus = true : this.taskStatus = !this.taskStatus;
    };


    confirmation(value: boolean) {
        this.confirmed = value;
    };
};




class TasklListSearch extends TaskList {
    getTaskByField(field: string, value: number | string | Date): Task | undefined {
        return this.tasks.find(task => task[field] === value);
    };
};

class TasklListSorting extends TaskList {

    sortByDate(): void {
        this.tasks.sort((a: Task, b: Task) => {
            return a.date.getTime() - b.date.getTime();
        });
    }

    sortByStatus(): void {
        this.tasks.sort((a: Task, b: Task) => {
            return Number(a.taskStatus) - Number(b.taskStatus);
        });
    }
}