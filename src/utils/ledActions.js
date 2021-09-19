const turnOnLed = device => {
  if (!device) {
    return;
  }
  device
    .write('11')
    .then(res => {
      console.log('Turned on');
      console.log(res);
    })
    .catch(err => {
      console.log('Error turning on');
      console.log(err);
    });
};

const turnOffLed = device => {
  if (!device) {
    return;
  }
  device
    .write('22')
    .then(res => {
      console.log('Turned off');
      console.log(res);
    })
    .catch(err => {
      console.log('Error turning off');
      console.log(err);
    });
};

export {turnOnLed, turnOffLed};
