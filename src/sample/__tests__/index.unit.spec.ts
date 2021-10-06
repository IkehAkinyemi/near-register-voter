import { Voter } from "./../assembly/model";
import { VMContext } from "near-sdk-as";
import { Context } from "near-sdk-as";
import { register, vote, relegateVote } from "../assembly";
import { voters } from "../assembly/model";

const voterID = "sample.testnet";

describe("Contract", () => {
  beforeEach(() => {
    VMContext.setSigner_account_id(voterID);
    register("Graate", 23);
  });
  it("Register a new Voter in the blockchain", () => {
    const voter = voters.get(voterID) as Voter;
    expect(voter.id).toStrictEqual(
      voterID,
      "Voter with the id: " + voterID + " was registered"
    );
  });

  it("Voting on the blockchain", () => {
    vote();
    const voter = voters.get(voterID) as Voter;
    expect(voter.voted).toBeTruthy("This voter has voted successfully!");
  });
});
