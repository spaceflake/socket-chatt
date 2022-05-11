import { Message } from '../types';

// A single conversation between two parties
class DmConversation {
  usernames: string[] = [];
  messages: Message[] = [];
}

// Class containing all conversations per user
class DmConversationCollection {
  // Map other partys username with the conversation between the first party and other party
  conversations = new Map<string, DmConversation>();
}

// Map username with a collection of conversations the specific user is part of
const mapUsernameConversations = new Map<string, DmConversationCollection>();

// Get an array of usernames for which the specific user have DM Conversations with
export function getDmConversationsForUser(user: string) {
  const userConversationCollection = mapUsernameConversations.get(user);
  if (userConversationCollection === undefined) {
    return [];
  }

  return Array.from(userConversationCollection.conversations.keys());
}

// Get all messages in a conversation
export function getMessagesForDmConversation(user1: string, user2: string) {
  const messages = mapUsernameConversations
    .get(user1)
    ?.conversations.get(user2)?.messages;
  return messages ?? [];
}

// Adds a message to a specific conversation or creates one if the conversation doesn't already exist
export function addMessageToDmConversation(
  recipient: string,
  message: Message
) {
  const sender = message.sender;

  // Assign an empty DmConversationCollection to the sender if he have no existing collection
  if (!mapUsernameConversations.has(sender)) {
    mapUsernameConversations.set(sender, new DmConversationCollection());
  }

  // Assign an empty DmConversationCollection to the recipient if he have no existing collection
  if (!mapUsernameConversations.has(recipient)) {
    mapUsernameConversations.set(recipient, new DmConversationCollection());
  }

  //
  const senderDMs = mapUsernameConversations.get(sender);
  if (senderDMs && !senderDMs?.conversations.has(recipient)) {
    const conversation = new DmConversation();
    conversation.usernames.push(sender, recipient);

    senderDMs.conversations.set(recipient, conversation);
    mapUsernameConversations
      .get(recipient)
      ?.conversations.set(sender, conversation);
  }

  senderDMs?.conversations.get(recipient)?.messages.push(message);
}
