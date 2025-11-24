import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
export default class InterfaceMainPannelMessageContainer extends Component {
  @tracked temporaryMessageStream = [
    {
      user:"Hey",
      assistant: "How Can i help you Today"
    },
    {
      user:"Can you help me understand the principles of neumorphic design?",
      assistant: " Absolutely! Neumorphic design, also called soft UI, is a modern design trend that combines elements of skeuomorphism and flat design. It creates a soft, extruded plastic look using shadows and highlights. The key is using two shadows: one dark and one light, creating depth while maintaining a minimal aesthetic."
    },
  ]
}
