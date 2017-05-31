const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () =>{

  it('PostCount property reflects number of existing posts',(done)=>{
    //create user with multiple posts
    const paul = new User({
      name: 'Paul',
      posts: [{title: '1st Post'}, {title: '2nd title'}]
    });
    //save
    paul.save()
    //fetcg
      .then(() => User.findOne({name: 'Paul'}))
      //assert
      .then((user) => {
        assert(paul.postCount === 2);
        done();
      });
  });
});
