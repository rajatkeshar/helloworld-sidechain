module.exports = async function () {
  console.log('enter dapp init')
  app.id = app.rootDir.split('/')[6];

  app.registerContract(2000, 'storage.set');
  console.log("app.contract: ", app.contract);

  app.events.on('newBlock', (block) => {
    console.log('new block received', block.height)
  })
}
