// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// THESE ARE FOR TESTING PURPOSES ONLY
// TOKEN SYMBOL IS NOT ACTUALLY USED FOR THE REAL TOKEN
// ADMIN ROLE IS FOR TESTING PURPOSES ONLY
/**



                   +----------------------no---------------------------+
                   |                                                   |
                   |  +------no------+            +-no--+              |
                   v  v              |            v     |              |
                  +-------+      +---+----+     +----+--+-+      +-----+----+
                  |       |      |        |     |         |      |          |
             +--->|  X1   +-yes->|    X2  +-yes>|    _    +-yes->|     X3   |
             |    |       |      |        |     |         |      |          |
             |    +---+---+      +--------+     +---------+      +-----+----+
             |        |               ^                                |
             |        |               |                                |
             +---no---+               |                                |
                                      +--------------yes---------------+

                                                   useless diagram?
*/                                                   

import "./@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";
import "./@openzeppelin/contracts/access/AccessControl.sol";

contract Manifold is ERC20, ERC20Snapshot, AccessControl {
    bytes32 public constant SNAPSHOT_ROLE = keccak256("SNAPSHOT_ROLE");

    constructor() ERC20("Manifold", "MFT") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(SNAPSHOT_ROLE, msg.sender);
        _mint(msg.sender, 2000000 * 10**decimals());
    }

    function snapshot() public {
        require(hasRole(SNAPSHOT_ROLE, msg.sender));
        _snapshot();
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Snapshot) {
        super._beforeTokenTransfer(from, to, amount);
    }
}
