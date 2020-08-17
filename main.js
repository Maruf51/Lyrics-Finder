

document.getElementById('search-btn').addEventListener('click', function(){
    document.getElementById('pre').style.display = "none"; // for hiding pre tag
    document.getElementById('lyrics').innerText = ""; // for doing empty lyrics area
    document.getElementById('lyricsName').innerText = ""; // for doing empty lyrics name area
    

    var inputValue = document.getElementById('input-value').value; // getting value from search box

    if(inputValue == ''){ // if input value is empty this will do a alert
        alert('Please Write a Song Name. Then try again...')
    }

    else{
        fetch('https://api.lyrics.ovh/suggest/'+inputValue+'') // getting song info from server
        .then(response => response.json())
        .then(data => {
    
            // if you search song again, this will delete the previous search data
            var list = document.getElementById("content-area2");
            while (list.hasChildNodes()) {
                list.removeChild(list.firstChild);
            }
            
            // for getting the data object value
            for (let i = 0; i < 10; i++) {
                const element = data.data[i];
                const number = [i];
    
                const song = element;
                const songTitle = song.title;
                const albumTitle = song.album['title'];
                const artistName = song.artist.name;
    
                songDetailArea(songTitle, albumTitle, artistName, number);

                
            }
    
            // creating search value, total 10 time.
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


            // for getting lyrics when you tap the get lyrics button
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
            

            // for sending object number to find lyrics
            function lyrics(number){
                document.getElementById('pre').style.display = "block"; // for doing empty the lyrics area, when you try to open another lyrics

                const title = data.data[number].title;
                const artist = data.data[number].artist.name
                songLyrics(artist, title)

                // for getting lyrics info from the server
                function songLyrics(artist, title){
                    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
                    .then(response => response.json())
                    .then(data => {
                        // if there is no lyrics / if you get error from server
                        if(data.error){ 
                            document.getElementById('lyrics').innerText = "Lyrics not found";
                            // for design the error lyrics
                            document.getElementById('lyricsName').innerText = artist + " - " + title;
                            document.getElementById('lyrics').style.color = "#dc3545";
                        }
                        else{
                            // for showing the lyrics
                            const songLyrics = data.lyrics;
                            document.getElementById('lyrics').innerText = songLyrics;
                            // for lyrics name
                            document.getElementById('lyricsName').innerText = artist + " - " + title;
                            // for lyrics design
                            document.getElementById('lyrics').style.color = "white";

                        }
                        
                    })
                }
            }
        })
    }
})
