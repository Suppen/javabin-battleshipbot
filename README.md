Vår prisvinnende Battleship bot, skrevet i JavaScript og kjører i Nodejs

Vi (Simen de Lange og Morten Mehus) fikk ca. 2.5 timer på oss til å lage et script som spilte Battleship over en websocket. Dette er vår bot, som vant hele turneringen, men var veeeeeldig jevn mot Lars sin bot i finalen.

Strategien er som følger:

#### 1
Skyt først diagonale linjer langs brettet med 3 tomme horisontale og vertikale ruter mellom hvert skudd. Dette garanterer at skipene med lengde 4 og 5 finnes temmelig raskt, i tillegg til at sannsynligheten er høy for at også de mindre skipene finnes. Hvilken rekkefølge disse rutene skytes på er tilfeldig. Dette mønsteret skapes:

    X...X...X...
    .X...X...X..
    ..X...X...X.
    ...X...X...X
    X...X...X...
    .X...X...X..
    ..X...X...X.
    ...X...X...X
    X...X...X...
    .X...X...X..
    ..X...X...X.
    ...X...X...X

#### 2
Fyll deretter inn de resterende diagonalene slik at antall treff danner et skrått grid over brettet, hvor det ikke er mer enn én uskutt rute mellom to skudd. Rekkefølgen dette gjøres er også tilfeldig. Når dette er gjort, ser brettet slik ut:

    X.X.X.X.X.X.
    .X.X.X.X.X.X
    X.X.X.X.X.X.
    .X.X.X.X.X.X
    X.X.X.X.X.X.
    .X.X.X.X.X.X
    X.X.X.X.X.X.
    .X.X.X.X.X.X
    X.X.X.X.X.X.
    .X.X.X.X.X.X
    X.X.X.X.X.X.
    .X.X.X.X.X.X

#### 3
Hvis det mot formodning fortsatt finnes skip igjen, skyt de resterende rutene i tilfeldig rekkefølge. Brettet ser da slik ut

    XXXXXXXXXXXX
    XXXXXXXXXXXX
    XXXXXXXXXXXX
    XXXXXXXXXXXX
    XXXXXXXXXXXX
    XXXXXXXXXXXX
    XXXXXXXXXXXX
    XXXXXXXXXXXX
    XXXXXXXXXXXX
    XXXXXXXXXXXX
    XXXXXXXXXXXX


Ethvert treff på en båt vil avbryte denne strategien, og bruke en flood-fill-lignende algoritme for å teppebombe området hvor botten fikk et treff. Når det er gjort, vil den fortsette der den slapp i sitt opprinnelige mønster


I dette repoet finner du mappene `battleship`, som er bleeding edge-versjonen som stadig krasjer, `battleship_funker`, som utelukkende følger de tre punktene over uten å ta hensyn til treff, `battleship_funker_2`, som er versjonen vi vant med, og `battleship_funker_3`, som skyter litt mer intelligent etter at den har truffet et skip, men som dessverre krasjer nå og da, og derfor ikke ble brukt i konkurransen

