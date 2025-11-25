import InstructionMode from './utility/InstructionMode';


// * AgentCoreClient Config: AcsConfig
// * AcsConfig should be a nested part of AcsObject
//* key class to configure llm
export default class AcsConfig {

  constructor(acs_object_id) {
    this.acs_object_id = acs_object_id;
    this.mode = InstructionMode.NULL_MODE; //similar to assigning null
    this.temperature = 0.0; // 0 means temperature control disabled,
    this.minToken = 0.0;// 0 means minToken control disabled,
    this.maxToken = 0.0;// 0 means maxToken control disabled,
    this.thinking = false;//off
    this.root = false;//will give access to mcp capabilities
    this.model=null;// primarily no access for model selection
  }

  setMode(acs_object_id,mode) {
    if(acs_object_id!==this.acs_object_id)throw new Error("config update failed")
    if(mode===InstructionMode.NULL_MODE)throw new Error("cannot set null mode")
    this.mode = mode
  }

  setThinking(acs_object_id,thinking) {
    if(acs_object_id!==this.acs_object_id)throw new Error("config update failed")
    this.thinking = Boolean(thinking)
  }

}
