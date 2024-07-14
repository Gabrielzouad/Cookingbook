import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { adjustRecipe, Ingredient, Recipe } from '../utils/utils';

function ListIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <line x1='8' x2='21' y1='6' y2='6' />
      <line x1='8' x2='21' y1='12' y2='12' />
      <line x1='8' x2='21' y1='18' y2='18' />
      <line x1='3' x2='3.01' y1='6' y2='6' />
      <line x1='3' x2='3.01' y1='12' y2='12' />
      <line x1='3' x2='3.01' y1='18' y2='18' />
    </svg>
  );
}

export default function Component({
  initialRecipe,
}: {
  initialRecipe: Recipe;
}) {
  const [servings, setServings] = useState<number>(initialRecipe.servings);
  const [adjustedRecipe, setAdjustedRecipe] = useState<Recipe>(initialRecipe);

  useEffect(() => {
    setAdjustedRecipe(adjustRecipe(initialRecipe, servings));
  }, [servings]);

  const handleServingsChange = (value: string) => {
    setServings(Number(value));
  };

  return (
    <div className='w-full'>
      <div className='relative'>
        <img
          src='/placeholder.jpg'
          alt='Recipe Image'
          width={1920}
          height={1080}
          className='w-full h-[400px] md:h-[600px] object-cover'
        />
        <div className='absolute inset-0 flex flex-col justify-end p-6 md:p-10'>
          <h1 className='text-3xl md:text-5xl font-bold text-primary-foreground'>
            Delicious Pasta Primavera
          </h1>
          <p className='text-muted-foreground mt-2 md:text-lg'>
            A vibrant and flavorful pasta dish featuring fresh spring
            vegetables.
          </p>
          <div className='mt-4 flex items-center gap-2'>
            <Label htmlFor='servings' className='text-sm font-medium'>
              Servings:
            </Label>
            <Select
              value={servings.toString()}
              onValueChange={handleServingsChange}
            >
              <SelectTrigger className='w-20'>
                <SelectValue placeholder='Select' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='2'>2</SelectItem>
                <SelectItem value='4'>4</SelectItem>
                <SelectItem value='6'>6</SelectItem>
                <SelectItem value='8'>8</SelectItem>
                <SelectItem value='10'>10</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className='container grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 py-12 md:py-16'>
        <div>
          <h2 className='text-2xl font-bold mb-4'>Recipe Steps</h2>
          <ol className='grid gap-6'>
            <li className='flex items-start gap-4'>
              <div className='flex-none w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold'>
                1
              </div>
              <div>
                <h3 className='font-semibold'>Prepare the Vegetables</h3>
                <p className='text-muted-foreground'>
                  Wash and chop the asparagus, bell peppers, and zucchini into
                  bite-sized pieces.
                </p>
              </div>
            </li>
            <li className='flex items-start gap-4'>
              <div className='flex-none w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold'>
                2
              </div>
              <div>
                <h3 className='font-semibold'>Cook the Pasta</h3>
                <p className='text-muted-foreground'>
                  Bring a large pot of salted water to a boil and cook the pasta
                  according to package instructions.
                </p>
              </div>
            </li>
            <li className='flex items-start gap-4'>
              <div className='flex-none w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold'>
                3
              </div>
              <div>
                <h3 className='font-semibold'>Sauté the Vegetables</h3>
                <p className='text-muted-foreground'>
                  In a large skillet, heat olive oil over medium heat. Add the
                  chopped vegetables and sauté until tender-crisp.
                </p>
              </div>
            </li>
            <li className='flex items-start gap-4'>
              <div className='flex-none w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold'>
                4
              </div>
              <div>
                <h3 className='font-semibold'>Combine and Serve</h3>
                <p className='text-muted-foreground'>
                  Drain the pasta and add it to the skillet with the sautéed
                  vegetables. Toss to combine and serve immediately, garnished
                  with freshly grated Parmesan cheese.
                </p>
              </div>
            </li>
          </ol>
        </div>
        <div className='sticky top-0 h-screen flex flex-col justify-start'>
          <h2 className='text-2xl font-bold mb-4'>Ingredients</h2>
          <ul className='flex flex-col gap-2'>
            {adjustedRecipe.ingredients.map((ingredient, index) => (
              <li key={index} className='flex items-center justify-between'>
                <span>{ingredient.name}</span>
                <span>
                  {typeof ingredient.quantity === 'number'
                    ? ingredient.quantity.toFixed(2)
                    : ingredient.quantity}{' '}
                  {ingredient.unit}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant='outline'
            size='lg'
            className='fixed bottom-4 left-1/2 -translate-x-1/2 md:hidden'
          >
            <ListIcon className='w-5 h-5 mr-2' />
            Ingredients
          </Button>
        </SheetTrigger>
        <SheetContent side='bottom' className='w-full max-w-md'>
          <div className='p-6'>
            <h2 className='text-2xl font-bold mb-4'>Ingredients</h2>
            <ul className='flex flex-col'>
              {adjustedRecipe.ingredients.map((ingredient, index) => (
                <li key={index} className='flex items-center justify-between'>
                  <span>{ingredient.name}</span>
                  <span>
                    {typeof ingredient.quantity === 'number'
                      ? ingredient.quantity.toFixed(2)
                      : ingredient.quantity}{' '}
                    {ingredient.unit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
