pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

contract Sell {
    struct total{
        string name;
        string price;
        string description;
        uint256 id;
        string breed;
        uint256 status;
        uint256 num;
    }

    total[] goods;
    
   mapping (address => uint256) public balanceOf;
   
    uint256  public newId;
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;
    
    constructor() public {
        
        name = 'REN MIN BI COIN';
        symbol = 'RMBC';
        decimals = 2;
        
        uint256 initialSupply = 10000000000;
        balanceOf[msg.sender] = initialSupply;              // Give the creator all initial tokens
        totalSupply = initialSupply;
    }
    
    function addGoods (string goodsname, string goodsprice, string goodsdescription, uint256 goodsstatus, string goodsbreed) public{

        if(goods.length >0){
            newId = goods.length;
        }else{
            newId = 0;
        }

        total memory _total = total({
            name : goodsname,
            price : goodsprice,
            description : goodsdescription,
            id : newId,
            status : goodsstatus,
            breed : goodsbreed,
            num : 1
        });
        uint256 newgoodsID = goods.push(_total) - 1;
    }
    function select (uint256 goodsid) public view returns (total){
        total Goods = goods[goodsid];
        return (Goods);
    }
    function getTotal () public view returns (total[]){
        return(goods);
    }
    function upload (uint256 goodsid, string goodsname, string goodsprice, string goodsdescription, uint256 goodsstatus, string goodsbreed) public returns(total){
        total storage Goods = goods[goodsid];
        Goods.name = goodsname;
        Goods.price= goodsprice;
        Goods.description = goodsdescription;
        Goods.id = goodsid;
        Goods.status = goodsstatus;
        Goods.breed = goodsbreed;
        return(Goods);
    }
    
    function buy (uint256 goodsid, uint256 _value, address _to) public {
        total storage Goods = goods[goodsid];
        Goods.num = 0;
        transfer(_to,_value);
    }
    
    function transfer(address _to, uint256 _value) public  {
        
        require(balanceOf[msg.sender] >= _value);           // Check if the sender has enough
        require(balanceOf[_to] + _value >= balanceOf[_to]); // Check for overflows
        balanceOf[msg.sender] -= _value;                    // Subtract from the sender
        balanceOf[_to] += _value;                           // Add the same to the recipient
    }
}