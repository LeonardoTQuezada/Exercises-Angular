interface AudioPlayer {
    audioVolume: number; // 0 to 100
    songDuration: number; 
    song: string;
    details: Details;
}

interface Details {    
    author: string
    year: number;
}

const audioPlayer: AudioPlayer = {
    audioVolume: 90,
    songDuration: 36,
    song: 'My way',
    details: {  
        author: 'Frank Sinatra',
        year: 1969  
    }
}   


console.log('Audio Player', audioPlayer);

const { audioVolume, songDuration: duration, song, details } = audioPlayer;
const { author } = details;     
console.log('Destructuring', audioVolume, duration, song, author);

const dbz: string[] = ['Goku', 'Vegeta', 'Trunks'];
const [ , , p3 = 'Not found' ] = dbz;
console.log('Personaje 3:', p3);    













export {};