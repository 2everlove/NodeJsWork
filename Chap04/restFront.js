async function getUser(){ // when loading get user info
    try {
        const res =await axios.get('/users');
        const users = res.data;
        const list = document.getElementById('list');
        list.innerHTML = '';

        //each users view presentation and connect event
        Object.keys(users).map(function(key){
            const userDiv = document.createElement('div');
            const span = document.createElement('span');
            span.textContent = users[key];
            const edit = document.createElement('button');
            edit.textContent = '수정';
            edit.addEventListener('click', async () => { // edit button click
                const name = prompt('바꿀 이름을 입력하세요');
                if(!name){
                    return alert('이름을 반드시 입력하셔야 합니다.');
                }
                try {
                    await axios.put('/user/'+key,{name});
                    getuser();
                } catch (error) {
                    console.log(error);
                }
            });
            const remove = document.createElement('button');
            remove.textContent = '삭제';
            remove.addEventListener('click', async() => { //remove button click
            try {
                await axios.delete('/user/'+key);
                getuser();
            } catch (error) {
                console.log(error);
            }
            });
            userDiv.appendChild(span);
            userDiv.appendChild(edit);
            userDiv.appendChild(remove);
            list.appendChild(userDiv);
            console.log(res.data);
        });
    } catch (error) {
        console.log(error);
    }
}

window.onload = getUser; //window loading getUser()
//form submit
document.getElementById('form').addEventListener('submit', async (e) =>{
    e.preventDefault();
    const name = e.target.username.value;
    if(!name){
        return alert('이름을 입력하세요');
    }
    try {
        await axios.post('/user', {name});
        getUser();
    } catch (error) {
        console.error(error);
    }
    e.target.username.value = '';
});