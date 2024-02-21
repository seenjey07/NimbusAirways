# frozen_string_literal: true

class Users::ConfirmationsController < Devise::ConfirmationsController
  # GET /resource/confirmation/new
  def new
    super
  end

  # POST /resource/confirmation
  def create
    super
  end

  # GET /resource/confirmation?confirmation_token=abcdef
  def show
    super
  end

  protected
  def after_resending_confirmation_instructions_path_for(resource_name)
    super(resource_name)
  end

  def after_confirmation_path_for(resource_name, resource)
    'https://nimbusairways.vercel.app/login'
  end
end
