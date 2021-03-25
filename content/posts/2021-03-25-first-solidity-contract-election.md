---
template: post
title: "First Solidity Contract: Election"
slug: solidity-election
socialImage: /media/solidity.jpeg
draft: false
date: 2021-03-25T21:48:07.552Z
description: Summary of my first Solidity Contract
category: Solidity
tags:
  - Solidity
---
For some time I have been wanting to move over into development in the blockchain sphere of technology. I think that it will have impact the world in some profound ways that we have yet to see as this ecosystem matures. However, my current skillset lies very much in the ecosystem of web development. So, in order to build up a base skillset I am going to work on creating a number of small distributed applications that can be completed in about a week each. I plan on starting with some basic contracts in Solidity, creating my own token, creating NFT's, and using Chainlink to bring in some oracle data as a starting place. 

The first project I created was a simple election. This was inspired by the YouTube channel Dapp University. I watched a 3 year old video, which is very outdated and the code no longer really works in 2021. However, what I did instead was take the idea and created it on my own using documentation after. I decided to use the react truffle box (<https://www.trufflesuite.com/boxes/react>) to get myself up and running quick, and just focused on writing the contract itself. For my development environment I used truffle to deploy the contracts, and ganache as my local blockchain test net. 

My repository for this project can be found here: <https://github.com/corwintines/solidity-election>

Here is the Election contract:

```javascript
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract Election {
  // Candidate structure
  struct Candidate {
    uint id;
    string name;
    uint voteCount;
  }

  // Instantiate Candidates
  constructor () public {
    addCandidate("Candidate 1");
    addCandidate("Candidate 2");
  }

  // Iterator to track number of candidates
  uint public candidatesCount;

  // Maps a candidate to an interger key. With it being public this functions as a getter
  mapping(uint => Candidate) public candidates;

  // Maps voter hash to boolean. Will use this to keep track of if a wallet has voted
  mapping(address => bool) public voters;

  // Function that increments candidate count, and creates a new candidate mapped to the id in candidates.
  // This newly created candidate is instantiated with an ID of the candidateCount iterator, name passed to function,
  // and 0 voteCount
  function addCandidate (string memory _name) private {
    candidatesCount ++;
    candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
  }

  // Vote function which takes a _candidateId and votes for that candidate if the user hasnt voted
  // and the id is valid. We then mark the address this vote came from as voted.
  function vote (uint _candidateId) public {
    require(!voters[msg.sender], "User already voted"); // Make sure message sender hasnt voted before

    require(0 < _candidateId && _candidateId <= candidatesCount, "Not a valid Candidate ID"); // Make sure _candidiateId is a valid ID

    candidates[_candidateId].voteCount++; // Increment candidates voteCount

    voters[msg.sender] = true; // Mark address as voted
  }
}
```

I have commented this contract to explain what is happening. This contract creates some candidates, keeps track of the candidates, allows users to vote, and keeps track of users who have voted. The UI is very basic html with no styling, but I think I will flush this out to complete the project. 

This project was quite simple to make, but really that is mostly due to this being a simple project. I am looking forward to progressing in to some more challenging projects that will take me down some rabbit holes. Another thing I will need to pick up is a proper set of debugging tools for this. While I was able to get away with just the truffle console to play around with this, I do think as I progress into more complex projects a good debugging setup will be needed.