import {Observable, Subject, Subscription} from 'rxjs';

export interface IBus {
    increment:number;
}

class StudyPetService {
    private bus = new Subject<IBus>();

    constructor() {
        // Initialize life
    }

    getEventBus(): Observable<IBus> {
        return this.bus.asObservable();
    }

    sendAppEvent(event: IBus) {
        this.bus.next(event);
    }

}

const App = new StudyPetService();
export default App;
