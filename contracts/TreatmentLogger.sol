// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TreatmentLogger {

    struct Treatment {
        uint id;
        string patientId;
        string service;
        uint cost;
        uint timestamp;
    }

    uint public treatmentCount;

    mapping(uint => Treatment) public treatments;

    function addTreatment(
        string memory _patientId,
        string memory _service,
        uint _cost
    ) public {
        require(_cost > 0, "Cost must be greater than 0");

        treatmentCount++;

        treatments[treatmentCount] = Treatment(
            treatmentCount,
            _patientId,
            _service,
            _cost,
            block.timestamp
        );
    }

    function getTreatment(uint _id) public view returns (Treatment memory) {
        return treatments[_id];
    }

    function getAllTreatments() public view returns (Treatment[] memory) {
        Treatment[] memory list = new Treatment[](treatmentCount);

        for (uint i = 1; i <= treatmentCount; i++) {
            list[i - 1] = treatments[i];
        }

        return list;
    }
}