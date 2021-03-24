const container: HTMLElement | any = document.getElementById("app")
const yugiohCard: number = 150

interface Yugiohs {
    id: number;
    name: string;
    image: string;
    type: string;
    atk: number;
    def: number;
    level: number;
}

const fetchData = (): void => {
    for (let i = 1; i <= yugiohCard; i++) {
        getYugioh(i)
    }
}

const getYugioh = async (id: number): Promise<void>  => {
    const data: Response = await fetch( `https://db.ygoprodeck.com/api/v7/cardinfo.php/${id}`)
    const yugiohCard: any = await data.json()
    const yugiohType: string = yugiohCard.types
    .map((yugi: any) => yugi.type.name)
    .join(", ")

    const transformedYugioh = {
        id: yugiohCard.id,
        name: yugiohCard.name,
        image: `${yugiohCard.sprites.front_default}`,
        atk: yugiohCard.atk,
        def: yugiohCard.def,
        level: yugiohCard.level,
    }

    showYugioh(transformedYugioh)
}

const showYugioh = (yugiohCard: Yugiohs): void => {
    let output: string = `
    <div class="card>
        <span class="card--id>#${yugiohCard.id}</span>
        <img class="card--image" src=${yugiohCard.image} alt=${yugiohCard.name} />
        <h1 class="card--name>${yugiohCard.name}</h1>
        <span class="card==detials>${yugiohCard.type}</span>
        <span class="card--details">${yugiohCard.atk}</span>
        <span class="card--details>${yugiohCard.def}</span>
        <span class="card--details>${yugiohCard.level}</span>
    </div>
    `;
    container.innerHtml += output;

}

fetchData()