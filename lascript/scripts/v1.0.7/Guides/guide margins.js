var value = prompt('Margin values (separator - space " ")', '10px');

$.guides.columns({
    amount: 1,
    unit: $.getUnits(value).split(' ')[0],
    direction: ',',
    margin: value,
    position: 'center'
});