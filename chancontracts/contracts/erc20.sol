// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "./Context.sol";
import "./IERC20.sol";
import "./SafeMath.sol";
import "./Address.sol";

/**
 * @dev Implementation of the {IERC20} interface.
 *
 * This implementation is agnostic to the way tokens are created. This means
 * that a supply mechanism has to be added in a derived contract using {_mint}.
 * For a generic mechanism see {ERC20PresetMinterPauser}.
 *
 * TIP: For a detailed writeup see our guide
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[How
 * to implement supply mechanisms].
 *
 * We have followed general OpenZeppelin guidelines: functions revert instead
 * of returning `false` on failure. This behavior is nonetheless conventional
 * and does not conflict with the expectations of ERC20 applications.
 *
 * Additionally, an {Approval} event is emitted on calls to {transferFrom}.
 * This allows applications to reconstruct the allowance for all accounts just
 * by listening to said events. Other implementations of the EIP may not emit
 * these events, as it isn't required by the specification.
 *
 * Finally, the non-standard {decreaseAllowance} and {increaseAllowance}
 * functions have been added to mitigate the well-known issues around setting
 * allowances. See {IERC20-approve}.
 */
contract ERC20 is Context, IERC20 {
    using SafeMath for uint256;
    using Address for address;

    mapping (address => uint256) private _balances;
    mapping (address => uint256) private _stakingBalances;
    mapping (address => uint256) private _blockWhenStaked;
    mapping (address => uint256) private _interestEarned;
    
    mapping (address => mapping (address => uint256)) private _allowances;

    uint256 private _totalSupply;

    string private _name;
    string private _symbol;
    bool private _enableBurn;
    bool private _useEmergencyTransfer;
    uint8 private _decimals;
    uint256 public _totalStake;
    uint256 public _stakingRewards;
    uint256 public _uniswapBurns;
    uint256 public _transferBurns;

    address payable private _owner;
    address public _uniswap;
    /**
     * @dev Sets the values for {name} and {symbol}, initializes {decimals} with
     * a default value of 18.
     *
     * To select a different value for {decimals}, use {_setupDecimals}.
     *
     * All three of these values are immutable: they can only be set once during
     * construction.
     */
    constructor (string memory name, string memory symbol, uint256 initialSupply,address payable owner) public {
        _name = name;
        _symbol = symbol;
        _decimals = 18;
        _owner = owner;
        _enableBurn = true;
        _stakingRewards = 0;
        _uniswapBurns = 0;
        _transferBurns = 0;
        _useEmergencyTransfer = false;
       _mint(owner, initialSupply);
    }

    function toggleEmergency(bool emergency) public {
        require(_msgSender() == _owner,"Only owner can call this");
        _useEmergencyTransfer = emergency;
    }

    function toggleBurn(bool burn) public {
        require(_msgSender() == _owner,"Only owner can call this");
        _enableBurn = burn;
    }

    function setUniswapAddress(address uniswap) public returns(bool) {
        require(_msgSender() == _owner,"Only the owner can change the uniswap address");
        _uniswap = uniswap;
        return true;
    }
    /**
     * @dev Returns the name of the token.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Returns the symbol of the token, usually a shorter version of the
     * name.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Returns the number of decimals used to get its user representation.
     * For example, if `decimals` equals `2`, a balance of `505` tokens should
     * be displayed to a user as `5,05` (`505 / 10 ** 2`).
     *
     * Tokens usually opt for a value of 18, imitating the relationship between
     * Ether and Wei. This is the value {ERC20} uses, unless {_setupDecimals} is
     * called.
     *
     * NOTE: This information is only used for _display_ purposes: it in
     * no way affects any of the arithmetic of the contract, including
     * {IERC20-balanceOf} and {IERC20-transfer}.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }

    /**
     * @dev See {IERC20-totalSupply}.
     */
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }

    /**
     * @dev See {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }

    // Get the total stacked
    function totalStaked() public view returns(uint256){
        return _totalStake;
    }

    function getTotalStakingReward() public view returns(uint256) {
        return _stakingRewards;
    }
    // Get the staking rewards for a user
    function stakingRewards(address stakingOwner) public view returns(uint256){
        if(_stakingBalances[stakingOwner] == 0) {
            return 0;
        }
        uint256 stakeRewardsForUser = (_stakingBalances[stakingOwner].div(_totalStake).mul(_stakingRewards));
        return  stakeRewardsForUser;
    }

    function getUniswapBurns() public view returns(uint256) {
        return _uniswapBurns;
    }
    
    function getTransferBurns() public view returns(uint256) {
        return _transferBurns;
    }
    /**
     * @dev See {IERC20-transfer}.
     *
     * Requirements:
     *
     * - `recipient` cannot be the zero address.
     * - the caller must have a balance of at least `amount`.
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        if(_useEmergencyTransfer) {
            _EmergencyTransfer(_msgSender(), recipient, amount);
        }else{
            _transfer(_msgSender(), recipient, amount);
        }
        return true;
    }

    /**
     * @dev See {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }

    /**
     * @dev See {IERC20-approve}.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
        _approve(_msgSender(), spender, amount);
        return true;
    }

    /**
     * @dev See {IERC20-transferFrom}.
     *
     * Emits an {Approval} event indicating the updated allowance. This is not
     * required by the EIP. See the note at the beginning of {ERC20};
     *
     * Requirements:
     * - `sender` and `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     * - the caller must have allowance for ``sender``'s tokens of at least
     * `amount`.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        _transfer(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: transfer amount exceeds allowance"));
        return true;
    }

    /**
     * @dev Atomically increases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }

    /**
     * @dev Atomically decreases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     * - `spender` must have allowance for the caller of at least
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue, "ERC20: decreased allowance below zero"));
        return true;
    }

    // Stakes a certain amount and moves it to the staking pool
    function stake(uint256 amount) public virtual returns(bool) {
        // Subtract the amount from msg.sender
        _totalStake = _totalStake.add(amount);
        // Update the block of the latest stake
        _blockWhenStaked[_msgSender()] = block.number;
        _balances[_msgSender()] = _balances[_msgSender()].sub(amount, "ERC20: transfer amount exceeds balance");
        _stakingBalances[_msgSender()] = _stakingBalances[_msgSender()].add(amount);
        emit Transfer(_msgSender(),_msgSender(),amount);
        return true;
    }

    function unstake(uint256 amount) public virtual returns(bool) {
        // Calculate what percentage of the % rewards did we own
        uint256 stakeRewards = (amount.div(_totalStake) * _stakingRewards);
        // If less than 30000 blocks, no reward
        if(_blockWhenStaked[_msgSender()].add(30000) > block.number) {
            // No rewards
            stakeRewards = 0;
        }else {
            _stakingRewards = _stakingRewards.sub(stakeRewards,"Failed to sub staking rewards for user from total staking rewards");
        }
        _totalStake = _totalStake.sub(amount,"ERC20: Cannot unstake more than what was staked");
        // Ensure that the staking balance is more than or equals to what we want to unstak
        _stakingBalances[_msgSender()] = _stakingBalances[_msgSender()].sub(amount,"ERC20: Cannot unstack more than you have stacked");
        _balances[_msgSender()] = _balances[_msgSender()].add(amount + stakeRewards);
        return true;
    }

    // Get the staking balance
    function getStake(address account) public view returns(uint256) {
        return _stakingBalances[account];
    }

    function getInterest(address account) public view returns(uint256) {
        return _interestEarned[account] + stakingRewards(account);
    }
    /**
     * @dev Moves tokens `amount` from `sender` to `recipient`.
     *
     * This is internal function is equivalent to {transfer}, and can be used to
     * e.g. implement automatic token fees, slashing mechanisms, etc.
     *
     * Emits a {Transfer} event.
     *
     * Requirements:
     *
     * - `sender` cannot be the zero address.
     * - `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);

        // Trigger a burn everytime if enableBurn is enabled.
        if(_enableBurn) {
            if(sender == _uniswap) {
                _burn(_owner, (amount * 10)/100);
                _uniswapBurns = _uniswapBurns.add((amount*5)/100);
                // Add 5% of the value to the staking reward pool
                _stakingRewards = _stakingRewards.add((amount * 5)/100);
            }else {
                _transferBurns = _transferBurns.add((amount*3)/100);
                _burn(_owner, (amount * 3)/100);
            }
        }
        emit Transfer(sender, recipient, amount);
    }
    function _EmergencyTransfer(address sender, address recipient, uint256 amount) internal virtual {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        emit Transfer(sender, recipient, amount);
    }
    
    /** @dev Creates `amount` tokens and assigns them to `account`, increasing
     * the total supply.
     *
     * Emits a {Transfer} event with `from` set to the zero address.
     *
     * Requirements
     *
     * - `to` cannot be the zero address.
     */
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");

        _beforeTokenTransfer(address(0), account, amount);

        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }

    /**
     * @dev Destroys `amount` tokens from `account`, reducing the
     * total supply.
     *
     * Emits a {Transfer} event with `to` set to the zero address.
     *
     * Requirements
     *
     * - `account` cannot be the zero address.
     * - `account` must have at least `amount` tokens.
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
        _balances[address(0)] = _balances[address(0)].add(amount);
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }

    /**
     * @dev Sets `amount` as the allowance of `spender` over the `owner`s tokens.
     *
     * This is internal function is equivalent to `approve`, and can be used to
     * e.g. set automatic allowances for certain subsystems, etc.
     *
     * Emits an {Approval} event.
     *
     * Requirements:
     *
     * - `owner` cannot be the zero address.
     * - `spender` cannot be the zero address.
     */
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    /**
     * @dev Sets {decimals} to a value other than the default one of 18.
     *
     * WARNING: This function should only be called from the constructor. Most
     * applications that interact with token contracts will not expect
     * {decimals} to ever change, and may work incorrectly if it does.
     */
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }

    /**
     * @dev Hook that is called before any transfer of tokens. This includes
     * minting and burning.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
     * will be to transferred to `to`.
     * - when `from` is zero, `amount` tokens will be minted for `to`.
     * - when `to` is zero, `amount` of ``from``'s tokens will be burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual {}
}