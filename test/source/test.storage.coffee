  describe 'Storage ::', ->
    before  ->
      localStorage.clear()

    it 'set and get simple value', ->
      parrot.local
      .set 'one','two'
      .set 'three','four'
      .set 'five','six'
      .one().should.eql 'two'
      localStorage.setItem('one', 'three')
      parrot.local.one().should.eql 'three'

    it 'set and get object', ->
      _object = foo:'bar'
      parrot.local
      .set('myData', _object)
      .myData().foo.should.eql 'bar'

    it 'updated a item', ->
      parrot.local
      .set 'one','three'
      .one().should.eql 'three'

    it 'get the size', ->
      parrot.local.size().should.eql 4

    it 'check for a key', ->
      parrot.local.isAvailable('one').should.eql true

    it 'remove one key', ->
      parrot.local.clear 'one'
      (->
        parrot.local.one()
      ).should.throw("undefined is not a function")
      value = localStorage['one'] or 'undefined'
      value.should.eql 'undefined'

    it 'remove different keys',->
      parrot.local.clear 'three', 'four'
      (->
        parrot.local.three()
      ).should.throw("undefined is not a function")
      value = localStorage['three'] or 'undefined'
      value.should.eql 'undefined'
      (->
        parrot.local.four()
      ).should.throw("undefined is not a function")
      value = localStorage['four'] or 'undefined'
      value.should.eql 'undefined'

    it 'remove all', ->
      parrot.local.clearAll()
      localStorage.length.should.eql 0
      parrot.local.size().should.eql 0

    describe 'Session ::', ->
      it 'save a simple session and retrieve', ->
        parrot.session.set('session')
        sessionStorage.getItem('session').should.eql 'session'
        parrot.session.get().should.eql 'session'

      it 'save a object session and retrieve', ->
        _session = foo: 'bar'
        parrot.session.set(_session)
        parrot.session.get().should.eql {foo: 'bar'}

      it 'delete the session',->
        parrot.session.clear()
        value = parrot.session.get() or 'null'
        value.should.eql 'null'
        value = sessionStorage['session'] or 'undefined'
        value.should.eql 'undefined'