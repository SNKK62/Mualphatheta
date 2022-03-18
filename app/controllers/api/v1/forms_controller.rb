class Api::V1::FormsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def create
        @form = Form.new(form_params)
        if @form.save
            render json: {form: @form}
        end
    end

    def index
        @forms = Form.all
        render json: {forms: @forms}
    end
    
    private
    def form_params
      params.require(:form).permit(:description)
    end
end