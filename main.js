

document.getElementById('search-btn').addEventListener('click', function(){
    document.getElementById('pre').style.display = "none";
    document.getElementById('lyrics').innerText = "";
    document.getElementById('lyricsName').innerText = "";
    

    var inputValue = document.getElementById('input-value').value;

    if(inputValue == ''){
        alert('Please Write a Song Name. Then try again...')
    }

    else{
        fetch('https://api.lyrics.ovh/suggest/'+inputValue+'')
        .then(response => response.json())
        .then(data => {
    
            var list = document.getElementById("content-area2");
            while (list.hasChildNodes()) {
                list.removeChild(list.firstChild);
            }
            
            for (let i = 0; i < 10; i++) {
                const element = data.data[i];
                const number = [i];
    
                const song = element;
                const songTitle = song.title;
                const albumTitle = song.album['title'];
                const artistName = song.artist.name;
    
                songDetailArea(songTitle, albumTitle, artistName, number);

                
            }
    
            function songDetailArea(title, albumTitle, artistName, number){
                document.getElementById('content-area2').innerHTML += `
                <div class="search-result col-md-8 mx-auto py-4">
                    <div class="single-result row align-items-center my-3 p-3">
                        <div class="col-md-9">
                            <h3 id="title1" class="lyrics-name">${title}</h3>
                            <p class="author lead">Album by <span>${albumTitle}</span></p>
                            <p id="artistName1" class="author lead">Artist Name: <span>${artistName}</span></p>
                        </div>
                        <div class="col-md-3 text-md-right text-center">
                            <a href="#lyrics">
                                <button id="button${number}" class="btn btn-success">Get Lyrics</button>
                            </a>
                        </div>
                    </div>
                </div>  `

            }


            document.getElementById('button0').addEventListener('click', function(){
                lyrics(0);
            })
            document.getElementById('button1').addEventListener('click', function(){
                lyrics(1);
            })
            document.getElementById('button2').addEventListener('click', function(){
                lyrics(2);
            })
            document.getElementById('button3').addEventListener('click', function(){
                lyrics(3);
            })
            document.getElementById('button4').addEventListener('click', function(){
                lyrics(4);
            })
            document.getElementById('button5').addEventListener('click', function(){
                lyrics(5);
            })
            document.getElementById('button6').addEventListener('click', function(){
                lyrics(6);
            })
            document.getElementById('button7').addEventListener('click', function(){
                lyrics(7);
            })
            document.getElementById('button8').addEventListener('click', function(){
                lyrics(8);
            })
            document.getElementById('button9').addEventListener('click', function(){
                lyrics(9);
            })
            

            function lyrics(number){
                document.getElementById('pre').style.display = "block";

                const title = data.data[number].title;
                const artist = data.data[number].artist.name
                songLyrics(artist, title)

                function songLyrics(artist, title){
                    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
                    .then(response => response.json())
                    .then(data => {
                        if(data.error){
                            document.getElementById('lyrics').innerText = "Lyrics not found";
                            document.getElementById('lyricsName').innerText = artist + " - " + title;
                            document.getElementById('lyrics').style.color = "#dc3545";
                        }
                        else{
                            const songLyrics = data.lyrics;
                            document.getElementById('lyrics').innerText = songLyrics;
                            document.getElementById('lyricsName').innerText = artist + " - " + title;
                            document.getElementById('lyrics').style.color = "white";

                        }
                        
                    })
                }
            }
        })
    }
})
