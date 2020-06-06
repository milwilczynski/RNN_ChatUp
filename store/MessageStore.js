export class MessageStore {
     constructor() {
        this.messages = '';
    }

    setMessage(msg){
         this.messages = msg;
    }

    getMessage(){
        return this.messages;
    }

}

export default MessageStore;
