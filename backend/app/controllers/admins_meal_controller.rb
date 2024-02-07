class AdminsMealController < ApplicationController
  def index_meals
    @meals = Meal.all
    render json: @meals
  end

  def create_meals
    @meal = Meal.new(meal_params)

    if @meal.save
      render json: @meal, status: :created
    else
      render json: { errors: @meal.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy_meal
    set_meal
    @meal.destroy
    render json: { message: 'Meal was successfully deleted.' }
  end

  private

  def set_meal
    @meal = Meal.find(params[:id])
  end

  def meal_params
    params.require(:meal).permit(:food, :quantity, :is_available)
  end
end
