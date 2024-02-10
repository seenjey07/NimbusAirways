class AdminsMealController < ApplicationController
  before_action :authenticate_user!
  before_action :require_admin
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

  def require_admin
    unless current_user && (current_user.role.downcase == 'admin' || current_user.role.downcase == 'superadmin')
      render json: { error: 'You are not authorized to access this page.' }, status: :unauthorized
    end
  end

end