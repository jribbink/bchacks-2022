import { MessageType } from '../enum/message-type';
import { Message } from '../messages'

export function resolveMessage(message: Message) {
    switch (message.type) {
        case MessageType.PLAYER_UPDATE:

        case MessageType.ENTITY_LIST_UPDATE:
            
    }
}