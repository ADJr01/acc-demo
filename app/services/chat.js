import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import InstructionMode from '../AgentCore/ACST/AgentCoreStreamObject/utility/InstructionMode';
export default class ChatService extends Service {
  @tracked interface = {
    title: 'Greeting From User',
    created_at: Date.now(),
    conversation: {
      id: '00io9a5rt92025',
      history: [
        {
          query: 'Hey?',
          assistant: 'Hey How Can i help You Today?',
          config:{
            mode: InstructionMode.BASIC_MODE,
            temperature: 0.0, // default temperature
            maxToken: 0,// 0 means maxToken control disabled
            minToken: 0,// 0 means minToken control disabled
            thinking:false, // decide if llm should think or not
            model: null
          },
          info: {
            timestamp: Date.now(),
            completion_time: '2s',
            progress: {
              status: '',
              message: '',
            },
            query_attachment: [],
            userReview: 0, // 0 means neutral,1 means positive,-1 means negative
          }
        },
      ],
    },
  };
}
