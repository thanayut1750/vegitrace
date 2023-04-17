
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract VegetableTraceability {
    struct Vegetable {
        string vegetableType;
        uint256 harvestDate;
        string location;
        string productionPractice;
    }

    event VegetableAdded(uint256 vegetableId, string vegetableType, uint256 harvestDate, string location, string productionPractice);

    mapping(uint256 => Vegetable) public vegetables;
    uint256 public vegetableCounter;

    function addVegetable(
        string memory _vegetableType,
        uint256 _harvestDate,
        string memory _location,
        string memory _productionPractice
    ) public {
        vegetableCounter++;
        vegetables[vegetableCounter] = Vegetable(
            _vegetableType,
            _harvestDate,
            _location,
            _productionPractice
        );

        emit VegetableAdded(vegetableCounter, _vegetableType, _harvestDate, _location, _productionPractice);
    }

    function getVegetable(uint256 _vegetableId)
        public
        view
        returns (
            string memory vegetableType,
            uint256 harvestDate,
            string memory location,
            string memory productionPractice
        )
    {
        Vegetable storage vegetable = vegetables[_vegetableId];
        return (
            vegetable.vegetableType,
            vegetable.harvestDate,
            vegetable.location,
            vegetable.productionPractice
        );
    }
}
