class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :creator
      t.string :visitor

      t.timestamps
    end
  end
end
