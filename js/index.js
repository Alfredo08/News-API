const API_KEY = "e993fe0805de4ec0abaff5d967e9302a";

function obtenerNoticias( event ){
    event.preventDefault();
    
    let topico = document.querySelector( '#topico' ).value;
    let cantidad = document.querySelector( '#numeroResultados' ).value;

    let url = `https://newsapi.org/v2/everything?q=${topico}&pageSize=${cantidad}`;
    let config = {
        method : "GET",
        headers : {
            //"X-Api-Key" : API_KEY,
            Authorization : `Bearer ${API_KEY}`
        }
    };

    fetch( url, config )
        .then( ( respuesta ) => {
            console.log( respuesta );
            if( respuesta.ok ){
                return respuesta.json();
            }
            else{
                throw Error( respuesta.statusText );
            }
        })
        .then( ( respuestaJSON ) => {
            let resultados = document.querySelector( '.resultados' );
            resultados.innerHTML = "";

            for( let i = 0; i < respuestaJSON.articles.length; i ++ ){
                resultados.innerHTML += `<div>
                                            <h2>
                                                ${respuestaJSON.articles[i].title}
                                            </h2>
                                            <div>
                                                <img src="${respuestaJSON.articles[i].urlToImage}" alt="${respuestaJSON.articles[i].source.name}" />
                                            </div>
                                            <h5>
                                                ${respuestaJSON.articles[i].author}
                                            </h5>
                                            <p>
                                                ${respuestaJSON.articles[i].description} 
                                            </p>
                                        </div>`;
            }
            
        })
        .catch( ( error ) => {
            console.log( error );
        });
}

let formularioNoticias = document.querySelector( '.formularioNoticias' );
formularioNoticias.addEventListener( 'submit', obtenerNoticias );