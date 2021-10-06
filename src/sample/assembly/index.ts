import { Voter, IDArr, voters } from "./model";
import {  Context } from "near-sdk-as";

export function register(name: string, age: i16): string {
  assert(!voters.contains(Context.sender), "You have already registered");
  const newVoter = new Voter(name, age);
  assert(age > 18, "Voter is not eligible");
  voters.set(Context.sender, newVoter);
  IDArr.push(Context.sender);
  return "Registered Voter: " + Context.sender;
}

export function vote(): string {
  assert(voters.contains(Context.sender), "This user is not registered to vote");
  const registeredVoter = voters.get(Context.sender) as Voter;

  assert(!registeredVoter.voted, "You have already voted");
  registeredVoter.voted = true;

  voters.set(Context.sender, registeredVoter);

  return "This voter has voted successfully!";
}

export function relegateVote(receiverID: string): string {
  assert(!voters.get(receiverID), "This voter is not regitstered on the blockchain");
  
  const giver = voters.get(Context.sender) as Voter;
  const receiver = voters.get(receiverID) as Voter;

  assert(!giver.voted, "You cannot relegate votes if you have already voted");
  assert(
    receiver.voted,
    "You cannot relegate vote to a user that have not voted"
  );

  giver.voted = true;
  receiver.voted = false;

  voters.set(Context.sender, giver);
  voters.set(receiverID, receiver);

  return (
    "Voter: " +
    giver.id +
    " has given out his right to vote to Voter: " +
    receiverID
  );
}
