import { Context } from "near-sdk-as";
import { PersistentMap, PersistentVector } from "near-sdk-core";

@nearBindgen
export class Voter {
  id: string;
  voted: bool;
  constructor(public name: string, public age: i16) {
    this.id = Context.sender;
    this.voted = false;
  }
}

export const IDArr = new PersistentVector<string>("IDs");
export const voters = new PersistentMap<string, Voter>("voters");
