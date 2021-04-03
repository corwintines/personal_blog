---
template: post
title: Creating an ERC20 Token with OpenZeppelin and Solidity
slug: erc20-token-openzeppelin-solidity
socialImage: /media/solidity.jpeg
draft: false
date: 2021-04-03T17:44:22.240Z
description: Creating an ERC20 token and basic interface to facilitate transactions for it
category: Solidity
tags:
  - Solidity
---
I implemented an ERC20 token to get familiar with the methods for the ERC20 standard. Instead of implementing the standard myself, I decided I would use the OpenZeppelins ERC20 contract (https://docs.openzeppelin.com/contracts/3.x/erc20). This would allow me to use inheritance for an implementation, and learn about how to mint tokens and play around with the methods for the standard. To play around with it I played around in the truffle console exploring the contract, implemented a few unit tests, as well as created a little UI in React. This UI used web3.js (https://web3js.readthedocs.io/en/v1.3.4/) to interface with the network and contracts. 

```
// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract Token is ERC20 {
  constructor (uint256 _initialSupply) ERC20("Corwintine", "CRWN") {
    _mint(msg.sender, _initialSupply * (10**uint256(decimals())));
  }
}
```

The code above is for my contract after inheriting from the ERC20 contract implemented by OpenZeppelin. As you can see, inheritance really helped me only need to do minimal implementation for this. In the constructor, we add the name and symbol for the token, as well as use the _mint method to mint the token with the initial supply amount. There is a quirk about this minting process for tokens which I had to learn about in Ethereum. Decimals do not exist in this currency, so it is implemented through a representation of decimals which can be used to imitate where a decimal point would go. Another quirk, which isn't really a quirk but just took some getting used to, was the fact that all values are stored in wei (the lowest denomination of the ether currency). Luckily, the web3 library comes with some utility functions that allow you to easily convert into and out of wei. 

![GUI](/media/screen-shot-2021-04-03-at-11.41.43-am.png "GUI")

The GUI is just a simple widget where the user can see the balance of their account, enter the amount they would like to send, and the address that they are sending to. Once they click the 'Send CRWN' button, the send amount will then be sent to the send address.

While doing this project, I came across a few different implementations for the ERC20 tokens. These different contracts that OpenZeppelin have implemented brought some additional functionality to these tokens which will be interesting to explore in the future. These implementations included:
- ERC20Permit: Implements the permit method which allows for gasless approval of tokens, meaning the user doesn't need to hold Ether.
- ERC20Snapshot: Implements the _snapshot method, which allows for the storage and querying of past token balances.
- ERC20Burnable: Implements the burn and burnFrom methods, which allows the token holder to destroy their tokens, or tokens that they have allowance for.
- ERC20Capped: Implements the cap method, and is used to add a cap to the supply of tokens.
- ERC20Pausable: Implements the paused, _pause, and _unpause methods which allows for the pausing for token transfers, minting, and burning. (Maybe this would have been nice to have back in the DAO wars).

Some of the other functionality I would like to play around with is using the minting tokens for miners in an ERC20 contract. This is certainly just a building block in the application to provide the means of exchange, but it was an interesting project to quickly make to learn how to mint these tokens.

Source Code: https://github.com/corwintines/solidity-erc20-crwn-token