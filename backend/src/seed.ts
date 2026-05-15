import db from './db';

type RestaurantSeed = {
  name: string; cuisine: string; city: string; price_range: number;
  rating: number; image_url: string; description: string; address: string; phone: string;
};

type MenuSeed = { name: string; description: string; price: number; category: string };

const data: { restaurant: RestaurantSeed; menu: MenuSeed[] }[] = [
  {
    restaurant: {
      name: 'Dастархан',
      cuisine: 'kazakh',
      city: 'Almaty',
      price_range: 2,
      rating: 4.7,
      image_url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
      description: 'Уютный ресторан казахской кухни с традиционными блюдами и домашней атмосферой.',
      address: 'ул. Абая 52, Алматы',
      phone: '+7 (727) 555-0101',
    },
    menu: [
      { name: 'Бешбармак', description: 'Отварная баранина с широкой лапшой и луком', price: 3200, category: 'Горячее' },
      { name: 'Куырдак', description: 'Жареные субпродукты с луком и специями', price: 2400, category: 'Горячее' },
      { name: 'Сорпа', description: 'Наваристый мясной бульон с зеленью', price: 900, category: 'Супы' },
      { name: 'Лагман', description: 'Тянутая лапша с мясом и овощами', price: 2100, category: 'Горячее' },
      { name: 'Баурсаки', description: 'Жареные пышки из дрожжевого теста', price: 600, category: 'Выпечка' },
      { name: 'Шубат', description: 'Кисломолочный напиток из верблюжьего молока', price: 700, category: 'Напитки' },
    ],
  },
  {
    restaurant: {
      name: 'Ханский Стол',
      cuisine: 'kazakh',
      city: 'Astana',
      price_range: 3,
      rating: 4.5,
      image_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
      description: 'Премиальная казахская кухня в исторической атмосфере ханского пира.',
      address: 'пр. Нурлыжол 12, Астана',
      phone: '+7 (717) 555-0202',
    },
    menu: [
      { name: 'Казы', description: 'Домашняя конская колбаса с чесноком', price: 2800, category: 'Закуски' },
      { name: 'Шужык', description: 'Вяленая конская колбаса со специями', price: 2600, category: 'Закуски' },
      { name: 'Бешбармак из конины', description: 'Традиционный бешбармак из отборной конины', price: 4500, category: 'Горячее' },
      { name: 'Плов по-казахски', description: 'Рассыпчатый плов с бараниной и морковью', price: 2900, category: 'Горячее' },
      { name: 'Самса', description: 'Слоёное тесто с начинкой из баранины', price: 500, category: 'Выпечка' },
      { name: 'Кумыс', description: 'Кисломолочный напиток из кобыльего молока', price: 800, category: 'Напитки' },
      { name: 'Чак-чак', description: 'Медовое лакомство из жареного теста', price: 900, category: 'Десерты' },
    ],
  },
  {
    restaurant: {
      name: 'La Bella Italia',
      cuisine: 'italian',
      city: 'Almaty',
      price_range: 3,
      rating: 4.8,
      image_url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
      description: 'Аутентичная итальянская кухня: домашняя паста, пицца из дровяной печи и тирамису.',
      address: 'ул. Достык 89, Алматы',
      phone: '+7 (727) 555-0303',
    },
    menu: [
      { name: 'Маргарита', description: 'Томаты, моцарелла, базилик', price: 2800, category: 'Пицца' },
      { name: 'Пепперони', description: 'Томаты, моцарелла, пикантная салями', price: 3200, category: 'Пицца' },
      { name: 'Карбонара', description: 'Паста спагетти, бекон, яйцо, пармезан', price: 3600, category: 'Паста' },
      { name: 'Тальятелле болоньезе', description: 'Домашняя паста с мясным рагу', price: 3800, category: 'Паста' },
      { name: 'Тирамису', description: 'Классический итальянский десерт с маскарпоне', price: 1500, category: 'Десерты' },
      { name: 'Панна-котта', description: 'Сливочный десерт с ягодным соусом', price: 1400, category: 'Десерты' },
      { name: 'Брускетта', description: 'Хрустящий хлеб с томатами и базиликом', price: 1200, category: 'Закуски' },
    ],
  },
  {
    restaurant: {
      name: 'Trattoria Roma',
      cuisine: 'italian',
      city: 'Astana',
      price_range: 2,
      rating: 4.4,
      image_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
      description: 'Семейная траттория с классическими итальянскими рецептами по доступным ценам.',
      address: 'ул. Сейткали Мендешева 3, Астана',
      phone: '+7 (717) 555-0404',
    },
    menu: [
      { name: 'Пицца 4 Сыра', description: 'Моцарелла, горгонзола, пармезан, рикотта', price: 3000, category: 'Пицца' },
      { name: 'Пицца Капричоза', description: 'Томаты, ветчина, грибы, оливки', price: 2900, category: 'Пицца' },
      { name: 'Феттуччине альфредо', description: 'Паста со сливочным соусом и пармезаном', price: 2800, category: 'Паста' },
      { name: 'Ризотто с грибами', description: 'Кремовое ризотто с белыми грибами', price: 3200, category: 'Паста' },
      { name: 'Суп минестроне', description: 'Томатный суп с овощами и пастой', price: 1100, category: 'Супы' },
      { name: 'Чизкейк', description: 'Нью-йоркский чизкейк с клубничным соусом', price: 1300, category: 'Десерты' },
    ],
  },
  {
    restaurant: {
      name: 'Сакура',
      cuisine: 'japanese',
      city: 'Almaty',
      price_range: 3,
      rating: 4.9,
      image_url: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800',
      description: 'Лучшие суши и сашими в Алматы. Свежая рыба, омакасе по запросу.',
      address: 'ул. Панфилова 44, Алматы',
      phone: '+7 (727) 555-0505',
    },
    menu: [
      { name: 'Сет Сакура (16 шт)', description: '4 вида роллов — классика шеф-повара', price: 4800, category: 'Сеты' },
      { name: 'Ролл Калифорния', description: 'Краб, авокадо, огурец, икра тобико', price: 2200, category: 'Роллы' },
      { name: 'Ролл Филадельфия', description: 'Лосось, сливочный сыр, авокадо', price: 2600, category: 'Роллы' },
      { name: 'Сашими лосось (8 шт)', description: 'Тонко нарезанный свежий лосось', price: 3200, category: 'Сашими' },
      { name: 'Мисо-суп', description: 'Бульон с тофу, водорослями вакамэ и луком', price: 700, category: 'Супы' },
      { name: 'Эдамаме', description: 'Варёные бобы эдамаме с морской солью', price: 800, category: 'Закуски' },
      { name: 'Моти мороженое', description: 'Японский рисовый десерт с мороженым', price: 900, category: 'Десерты' },
      { name: 'Рамен с курицей', description: 'Насыщенный бульон с лапшой и яйцом', price: 2400, category: 'Супы' },
    ],
  },
  {
    restaurant: {
      name: 'Tokyo Ramen',
      cuisine: 'japanese',
      city: 'Astana',
      price_range: 2,
      rating: 4.6,
      image_url: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800',
      description: 'Аутентичный японский рамен и гёдза в неформальной атмосфере.',
      address: 'пр. Республики 21, Астана',
      phone: '+7 (717) 555-0606',
    },
    menu: [
      { name: 'Рамен Тонкоцу', description: 'Свиной бульон, лапша, чашу, яйцо аджицукэ', price: 2700, category: 'Рамен' },
      { name: 'Рамен Шою', description: 'Соевый бульон, курица, нори, зелёный лук', price: 2500, category: 'Рамен' },
      { name: 'Рамен Мисо', description: 'Бульон мисо, свинина, кукуруза, масло', price: 2600, category: 'Рамен' },
      { name: 'Гёдза (6 шт)', description: 'Жареные пельмени со свининой и капустой', price: 1200, category: 'Закуски' },
      { name: 'Такояки (6 шт)', description: 'Шарики с осьминогом под соусом окономияки', price: 1400, category: 'Закуски' },
      { name: 'Японский чай', description: 'Зелёный чай матча или сенча', price: 500, category: 'Напитки' },
    ],
  },
  {
    restaurant: {
      name: 'Burger Boom',
      cuisine: 'fastfood',
      city: 'Almaty',
      price_range: 1,
      rating: 4.2,
      image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
      description: 'Сочные бургеры ручной лепки, хрустящие картошка и молочные коктейли.',
      address: 'ул. Байтурсынова 115, Алматы',
      phone: '+7 (727) 555-0707',
    },
    menu: [
      { name: 'Классик Бургер', description: 'Говяжья котлета, салат, томат, соус', price: 1900, category: 'Бургеры' },
      { name: 'Чизбургер Делюкс', description: 'Двойная котлета, чеддер, маринованный огурец', price: 2400, category: 'Бургеры' },
      { name: 'Чикен Бургер', description: 'Хрустящая курица, капуста, острый майонез', price: 2000, category: 'Бургеры' },
      { name: 'Картошка фри L', description: 'Хрустящий картофель с солью', price: 700, category: 'Гарниры' },
      { name: 'Луковые кольца', description: 'Хрустящие луковые кольца в панировке', price: 900, category: 'Гарниры' },
      { name: 'Молочный коктейль', description: 'Ваниль, шоколад или клубника', price: 1100, category: 'Напитки' },
      { name: 'Хот-дог', description: 'Говяжья сосиска, горчица, кетчуп', price: 1400, category: 'Бургеры' },
    ],
  },
  {
    restaurant: {
      name: 'FastGo',
      cuisine: 'fastfood',
      city: 'Astana',
      price_range: 1,
      rating: 4.0,
      image_url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
      description: 'Быстро, вкусно, дёшево. Шаурма, хот-доги и стрит-фуд на каждый день.',
      address: 'пр. Кабанбай Батыра 36, Астана',
      phone: '+7 (717) 555-0808',
    },
    menu: [
      { name: 'Шаурма Классик', description: 'Курица, овощи, соус в лаваше', price: 1200, category: 'Шаурма' },
      { name: 'Шаурма Острая', description: 'Курица, острый соус, халапеньо', price: 1300, category: 'Шаурма' },
      { name: 'Шаурма XXL', description: 'Двойная порция мяса в большом лаваше', price: 1800, category: 'Шаурма' },
      { name: 'Картофель по-деревенски', description: 'Запечённый картофель с паприкой', price: 700, category: 'Гарниры' },
      { name: 'Кола 0.5 л', description: 'Освежающий напиток со льдом', price: 400, category: 'Напитки' },
      { name: 'Сок апельсиновый', description: 'Свежевыжатый апельсиновый сок', price: 600, category: 'Напитки' },
    ],
  },
  {
    restaurant: {
      name: 'Тамада',
      cuisine: 'georgian',
      city: 'Almaty',
      price_range: 2,
      rating: 4.8,
      image_url: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800',
      description: 'Грузинская кухня: хинкали, хачапури и вина из Кахетии в живой атмосфере.',
      address: 'ул. Гоголя 73, Алматы',
      phone: '+7 (727) 555-0909',
    },
    menu: [
      { name: 'Хинкали (5 шт)', description: 'Сочные пельмени с мясом и зеленью', price: 1800, category: 'Хинкали' },
      { name: 'Хачапури по-аджарски', description: 'Лодочка с сыром, яйцом и маслом', price: 2200, category: 'Хачапури' },
      { name: 'Хачапури по-имеретински', description: 'Закрытый хачапури с сыром сулгуни', price: 1900, category: 'Хачапури' },
      { name: 'Чакапули', description: 'Баранина с тархуном и зелёной сливой', price: 3400, category: 'Горячее' },
      { name: 'Сациви', description: 'Курица в ореховом соусе с чесноком', price: 2800, category: 'Горячее' },
      { name: 'Пхали', description: 'Закуска из шпината и грецких орехов', price: 1100, category: 'Закуски' },
      { name: 'Кахетинское красное', description: 'Бокал натурального грузинского вина', price: 1400, category: 'Напитки' },
      { name: 'Чурчхела', description: 'Грузинская сладость из орехов и виноградного сока', price: 700, category: 'Десерты' },
    ],
  },
  {
    restaurant: {
      name: 'Кафе Тбилиси',
      cuisine: 'georgian',
      city: 'Astana',
      price_range: 2,
      rating: 4.5,
      image_url: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800',
      description: 'Уютное кафе с грузинскими блюдами домашнего приготовления.',
      address: 'ул. Иманова 8, Астана',
      phone: '+7 (717) 555-1010',
    },
    menu: [
      { name: 'Хинкали (5 шт)', description: 'Традиционные хинкали с говядиной и свининой', price: 1700, category: 'Хинкали' },
      { name: 'Хинкали с грибами (5 шт)', description: 'Вегетарианский вариант с лесными грибами', price: 1600, category: 'Хинкали' },
      { name: 'Хачапури по-мегрельски', description: 'Двойной сыр внутри и сверху', price: 2100, category: 'Хачапури' },
      { name: 'Лобиани', description: 'Пирог с пряной фасолью', price: 1500, category: 'Хачапури' },
      { name: 'Оджахури', description: 'Жареная свинина с картофелем и луком', price: 2900, category: 'Горячее' },
      { name: 'Суп харчо', description: 'Острый говяжий суп с рисом и грецкими орехами', price: 1300, category: 'Супы' },
    ],
  },
];

const count = (db.prepare('SELECT COUNT(*) as n FROM restaurants').get() as { n: number }).n;

if (count === 0) {
  const insertRest = db.prepare(`
    INSERT INTO restaurants (name, cuisine, city, price_range, rating, image_url, description, address, phone)
    VALUES (@name, @cuisine, @city, @price_range, @rating, @image_url, @description, @address, @phone)
  `);

  const insertMenu = db.prepare(`
    INSERT INTO menu_items (restaurant_id, name, description, price, category)
    VALUES (@restaurant_id, @name, @description, @price, @category)
  `);

  const seedAll = db.transaction(() => {
    for (const { restaurant, menu } of data) {
      const result = insertRest.run(restaurant);
      const restaurant_id = result.lastInsertRowid;
      for (const item of menu) insertMenu.run({ ...item, restaurant_id });
    }
  });

  seedAll();
  console.log(`Seeded ${data.length} restaurants with menu items.`);
} else {
  console.log(`Database already has ${count} restaurants — skipping seed.`);
}
