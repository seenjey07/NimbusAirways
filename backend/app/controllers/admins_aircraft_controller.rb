class AdminsAircraftController < ApplicationController
  before_action :authenticate_user!
  before_action :require_admin

  def index
    @aircrafts = Aircraft.all
    render json: @aircrafts, include: [:current_route]
  end



  private
  def require_admin
    unless current_user && (current_user.role.downcase == 'admin' || current_user.role.downcase == 'superadmin')
      render json: { error: 'You are not authorized to access this page.' }, status: :unauthorized
    end
  end

end
