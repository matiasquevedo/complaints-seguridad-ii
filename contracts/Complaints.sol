pragma solidity >=0.4.22 <0.9.0;

contract Complaints {
    struct Complaint {
        string text;
        address creator;
        uint256 creationTimestamp; 
        uint256 blockNumber;
    }

    mapping(address => Complaint[]) private userComplaints;
    Complaint[] private allComplaints;
    address public admin;

    constructor() {
        admin = msg.sender;
    }

    function addComplaint(string memory _complaintText) public {
        Complaint memory newComplaint = Complaint(_complaintText, msg.sender, block.timestamp, block.number); 
        userComplaints[msg.sender].push(newComplaint);
        allComplaints.push(newComplaint);
    }

    function updateComplaint(uint _complaintIndex, string memory _newComplaintText) public returns (bool) {
        if (_complaintIndex < userComplaints[msg.sender].length) {
            userComplaints[msg.sender][_complaintIndex].text = _newComplaintText;
            return true;
        }
        return false;
    }

    function deleteComplaint(uint _complaintIndex) public returns (bool) {
        if (_complaintIndex < userComplaints[msg.sender].length) {
            // Eliminar queja del usuario
            for (uint i = _complaintIndex; i < userComplaints[msg.sender].length - 1; i++) {
                userComplaints[msg.sender][i] = userComplaints[msg.sender][i + 1];
            }
            userComplaints[msg.sender].pop();
            
            // Eliminar queja de todas las quejas
            for (uint j = 0; j < allComplaints.length; j++) {
                if (allComplaints[j].creator == msg.sender && j == _complaintIndex) {
                    for (uint k = j; k < allComplaints.length - 1; k++) {
                        allComplaints[k] = allComplaints[k + 1];
                    }
                    allComplaints.pop();
                    break;
                }
            }
            return true;
        }
        return false;
    }

    function getMyComplaints() public view returns (Complaint[] memory) {
        return userComplaints[msg.sender];
    }

    function getAllComplaints() public view returns (Complaint[] memory) {
        return allComplaints;
    }

    function transferAdmin(address _newAdmin) public {
        admin = _newAdmin;
    }
}
