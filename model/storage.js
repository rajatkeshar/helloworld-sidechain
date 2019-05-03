module.exports = {
    name: 'storages',
    fields: [
      {
        name: 'set',
        type: 'String',
        length: 256,
        not_null: true
      },
      {
        name: 'owner',
        type: 'String',
        length: 50,
        not_null: true,
      }
    ]
  }
