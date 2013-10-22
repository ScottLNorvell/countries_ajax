
class CountriesController < ApplicationController

	def index
		@count = Country.count 
	end

	def show
		if params[:step] == 'all'
			countries = Country.all
		else
			countries = Country.limit(params[:step].to_i).offset(params[:pointer].to_i)
		end
		
		render json: countries
	end

end