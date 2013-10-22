CountryAjax::Application.routes.draw do
  root to: 'countries#index'

  get 'show' => 'countries#show'
end
