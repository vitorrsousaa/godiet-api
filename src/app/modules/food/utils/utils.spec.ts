import { TAttribute, TMeasure } from '@/entities/food';

import { calculateAttributes } from './food';

describe('food utils', () => {
  describe('calculateAttributes function', () => {
    it('should return a TAttribute object with calculated quantity', () => {
      // Arrange
      const baseQty = 100;

      const qty = 2;

      const attribute: TAttribute = {
        name: 'Test Attribute',
        unit: 'Test Unit',
        qty: 10,
      };

      const measure: TMeasure = {
        qty: 5,
        name: 'Colher',
      };

      const input = {
        baseQty,
        attribute,
        qty,
        measure,
      };

      // Act

      const result = calculateAttributes(input);

      // Assert

      expect(result.name).toBe('Test Attribute');

      expect(result.unit).toBe('Test Unit');

      expect(result.qty).toBe((attribute.qty * qty * measure.qty) / baseQty);
    });
  });
});
