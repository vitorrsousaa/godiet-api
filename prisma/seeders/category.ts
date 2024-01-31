import foodList from '../data/foodList.json';

const dataCategories: Record<string, number> = {
  'Alimentos preparados': 120,
  'Bebidas (alcoólicas e não alcoólicas)': 70,
  'Carnes e derivados': 100,
  'Cereais e derivados': 35,
  'Frutas e derivados': 60,
  'Gorduras e óleos': 76,
  'Leguminosas e derivados': 40,
  'Leite e derivados': 95,
  Miscelâneas: 70,
  'Nozes e sementes': 115,
  'Outros alimentos industrializados': 70,
  'Ovos e derivados': 70,
  'Pescados e frutos do mar': 105,
  'Produtos açucarados': 45,
  'Verduras, hortaliças e derivados': 15,
};

export function generateCategoryBaseForSeeding() {
  function calcAverage(list: number[]) {
    const sum = list.reduce((acc, value) => acc + value, 0);

    return sum / list.length;
  }

  const updateFoodList = foodList.map((food) => {
    const baseEnergy = dataCategories[food.categoryName] || 50;

    const attributes = food.attributes;

    const energyAttribute = attributes.find(
      (attribute) => attribute.name === 'energy'
    );

    const energyQty = energyAttribute
      ? typeof energyAttribute.qty === 'number'
        ? energyAttribute.qty
        : 1
      : 1;

    const newBaseQty = (baseEnergy * food.baseQty) / energyQty;

    return {
      ...food,
      baseQty: newBaseQty,
      attributes: attributes.map((attribute) => {
        if (attribute.name === 'energy') {
          return {
            name: attribute.name,
            qty: baseEnergy,
            unit: attribute.unit,
          };
        }

        if (typeof attribute.qty !== 'number') return attribute;

        return {
          name: attribute.name,
          qty: (attribute.qty * newBaseQty) / food.baseQty,

          unit: attribute.unit,
        };
      }),
    };
  });

  const baseCategorySeed = updateFoodList.reduce<
    {
      name: string;
      baseProtein: number;
      baseCarbo: number;
      baseFat: number;
      baseEnergy: number;
    }[]
  >((acc, food) => {
    const baseEnergy = dataCategories[food.categoryName] || 50;

    const protein = food.attributes.find(
      (attribute) => attribute.name === 'protein'
    );
    const carbo = food.attributes.find(
      (attribute) => attribute.name === 'carbohydrate'
    );
    const fat = food.attributes.find((attribute) => attribute.name === 'lipid');

    const newAcc = {
      name: food.categoryName,
      baseProtein: typeof protein?.qty === 'number' ? protein.qty : 0,
      baseCarbo: typeof carbo?.qty === 'number' ? carbo.qty : 0,
      baseFat: typeof fat?.qty === 'number' ? fat?.qty : 0,
      baseEnergy: baseEnergy,
    };

    acc.push(newAcc);

    return acc;
  }, []);

  const reduceCategorySeed = baseCategorySeed.reduce<
    Record<
      string,
      {
        name: string;
        baseProtein: number[];
        baseCarbo: number[];
        baseFat: number[];
        baseEnergy: number[];
      }
    >
  >((acc, baseCategory) => {
    const categoryName = baseCategory.name;
    if (!acc[categoryName]) {
      acc[categoryName] = {
        name: categoryName,
        baseProtein: [],
        baseCarbo: [],
        baseFat: [],
        baseEnergy: [],
      };
    }

    acc[categoryName].baseProtein.push(baseCategory.baseProtein);
    acc[categoryName].baseCarbo.push(baseCategory.baseCarbo);
    acc[categoryName].baseFat.push(baseCategory.baseFat);
    acc[categoryName].baseEnergy.push(baseCategory.baseEnergy);

    return acc;
  }, {});

  const average = Object.values(reduceCategorySeed).map((category) => {
    return {
      name: category.name,
      baseProtein: calcAverage(category.baseProtein),
      baseCarbo: calcAverage(category.baseCarbo),
      baseFat: calcAverage(category.baseFat),
      baseEnergy: calcAverage(category.baseEnergy),
    };
  });

  return average;
}
