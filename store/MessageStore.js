export class MessageStore {
     constructor() {
        this.messages = '';
        this.sender = '';
    }

    setMessage(msg){
         this.messages = msg;
    }

    getMessage(){
        return this.messages;
    }

    setSender(sender){
         this.sender = sender;

    }
    getSender(){
         return this.sender;
    }
}

export default MessageStore;
