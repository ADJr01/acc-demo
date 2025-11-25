import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
export default class ChatService extends Service {
  @tracked interface = {
    title: 'Greeting From User',
    created_at: Date.now(),
    converstation:{
      id:'00io9a5rt92025',
      history: {

      }
    }
  }
}
